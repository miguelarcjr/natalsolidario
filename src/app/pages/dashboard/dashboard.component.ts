import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  nome: string = '';
  url: string = '';
  file: any;

  constructor(private store: AngularFirestore, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  async myUploader(event: any) {
    for(let file of event.files) {
        this.file = file;
    }
    console.log(this.file);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID ab171eac0e14744");

    const formdata = new FormData();
    formdata.append("image", event.files[0]);

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://api.imgur.com/3/image", requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result)
        this.url = JSON.parse(result).data.link;
        console.log(this.url);
      })
      .catch(error => console.log('error', error));
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  cadastrar() {
    this.store.collection('colaboradores').add({nome : this.nome, url : this.url}).then(() => {
      this.nome = '';
      this.url = '';
      this.file = undefined;
      this.messageService.add({severity:'success', summary:'Cadastrado com sucesso'});
    })
  }
}
