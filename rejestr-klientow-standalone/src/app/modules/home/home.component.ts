import { Component } from '@angular/core';
import { UnlessDirective } from '../shared/directives/unless.directive';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [UnlessDirective]
})
export class HomeComponent {

}
