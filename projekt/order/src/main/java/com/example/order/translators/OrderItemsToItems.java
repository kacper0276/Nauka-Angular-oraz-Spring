package com.example.order.translators;

import com.example.order.entity.Items;
import com.example.order.entity.OrderItems;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper
public abstract class OrderItemsToItems {

    public Items toItems(OrderItems orderItems){
        return translate(orderItems);
    }

    @Mappings({
            @Mapping(target = "imageUrl", ignore = true),
            @Mapping(target = "price", source ="priceUnit"),
            @Mapping(target = "summaryPrice", source ="priceSummary"),
    })
    protected abstract Items translate(OrderItems orderItems);
}
