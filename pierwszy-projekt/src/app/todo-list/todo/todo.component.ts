import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent 
// implements OnChanges
// implements OnInit 
// implements DoCheck
implements AfterViewInit, OnDestroy, OnInit
{
  @Input() todo!: Todo;
  @Input() i!: number;
  @Output() delete = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<number>();
  @ViewChild('li') li!: ElementRef;
  openModal = false;
  timeout!: any;

  // constructor() {
  //   console.log(this.todo);
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }

  ngOnInit(): void {
    console.log(this.todo);
    this.timeout = setTimeout(() => {
      console.log('setTimeout');
    }, 3000);
  }

  // ngDoCheck(): void {
  //   console.log("ngDoCheck został wykonany");
  // }

  ngAfterViewInit(): void {
    console.log(this.li);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    clearTimeout(this.timeout);
  }

  changeTodoStatus(): void {
    this.changeStatus.emit(this.i);  
  }

  toogleModal(): void {
    this.openModal = !this.openModal;
  }

  deleteTodo(): void {
      this.delete.emit();
  }

}
