package com.example.basket.service;

import com.example.basket.entity.Basket;
import com.example.basket.entity.BasketItemAddDTO;
import com.example.basket.entity.BasketItems;
import com.example.basket.entity.Product;
import com.example.basket.repository.BasketItemRepository;
import com.example.basket.repository.BasketRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BasketService {

    private final BasketItemRepository basketItemRepository;
    private final BasketRepository basketRepository;
    private final RestTemplate restTemplate;
    private final CookieService cookieService;
    @Value("${product.service.url}")
    private String PRODUCT_URL;


    public ResponseEntity<?> add(BasketItemAddDTO basketItemAddDTO, HttpServletRequest request, HttpServletResponse response) {
        HttpHeaders httpHeaders = new HttpHeaders();
        List<Cookie> cookies = new ArrayList<>();
        if (request.getCookies() != null){
            cookies.addAll(List.of(request.getCookies()));
        }
        cookies.stream().filter(value -> value.getName().equals("basket"))
                .findFirst().ifPresentOrElse(value -> {
                    basketRepository.findByUuid(value.getValue()).ifPresentOrElse(basket -> {
                        addProductToBasket(basket, basketItemAddDTO);
                    }, () -> {
                        Basket basket = createBasket();
                        response.addCookie(cookieService.generateCookie("basket",basket.getUuid()));
                        addProductToBasket(basket,basketItemAddDTO);
                    });
                }, () -> {
                    Basket basket = createBasket();
                    response.addCookie(cookieService.generateCookie("basket",basket.getUuid()));
                    addProductToBasket(basket,basketItemAddDTO);
                });
        return ResponseEntity.ok().headers(httpHeaders).build();
    }


    private Basket createBasket(){
        Basket basket = new Basket();
        basket.setUuid(UUID.randomUUID().toString());
        return basketRepository.saveAndFlush(basket);
    }

    private void addProductToBasket(Basket basket, BasketItemAddDTO basketItemAddDTO) {
        BasketItems basketItems = new BasketItems();
        try {
            Product product = getProduct(basketItemAddDTO.getProduct());
            if (product != null) {
                basketItemRepository.findByBasketAndProduct(basket, String.valueOf(product.getId())).ifPresentOrElse(basketItems1 -> {
                    basketItems1.setQuantity(basketItems1.getQuantity() + basketItemAddDTO.getQuantity());
                    basketItemRepository.save(basketItems1);
                }, () -> {
                    basketItems.setBasket(basket);
                    basketItems.setUuid(UUID.randomUUID().toString());
                    basketItems.setQuantity(basketItemAddDTO.getQuantity());
                    basketItems.setProduct(product.getId());
                    basketItemRepository.saveAndFlush(basketItems);
                });
            }
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    private Product getProduct(String uuid) throws URISyntaxException {
        URI uri = new URIBuilder(PRODUCT_URL + "/getExternal").addParameter("uuid", uuid).build();
        ResponseEntity<?> response = restTemplate.getForEntity(uri, Product.class);
        if (response.getStatusCode().isError()) {
            return null;
        }
        return (Product) response.getBody();
    }
}