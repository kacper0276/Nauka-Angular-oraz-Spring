import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Client } from '../../../core/models/client.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from './delete-client-dialog/delete-client-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent implements OnInit {
  client!: Client;
  // ActivatedRoute - pobieranie parametrów
  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.clientsService.getClient(+params['id'])))
      .subscribe({
        next: (client) => {
          this.client = client;
        },
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent, {
      data: {
        client: this.client,
      },
    });
  }
}
