import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  colaboradores: {nome: string, url: string, id: string}[] = [];

  constructor(private store: AngularFirestore) { }

  ngOnInit(): void {
    /* for (let i = 0; i < 200; i++) {
      this.colaboradores.push(
        {
          id: '',
          nome: 'Guilherme Araujo',
          url: 'https://i.imgur.com/2wXyQRa.png'
        }
      );
    } */
    this.getAll();
  }

  getAll(){
    this.store.collection('colaboradores').snapshotChanges().subscribe((response) => {
      console.log('reponse ', response);
      this.colaboradores = response.map(item =>
        Object.assign({id : item.payload.doc.id}, item.payload.doc.data())
      ) as any;
      console.log(this.colaboradores);
    })
  }

}
