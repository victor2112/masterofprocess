import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComicItem } from 'src/app/models/ComicItem';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit {

  comics : ComicItem[];

  constructor(private backend: BackendService,
              private router: Router) { 
    this.comics = [];
  }

  ngOnInit(): void {
    this.backend.getComic().subscribe(x => {
      this.comics = x.comics;
    })
  }

  image(name: string) {
    if (name == "DC")
          {
            return 'echo <img src="../../../images/DC.jpg" class="gallery-image" alt="sample image" />';
          }
          else {
            return '<img src="../../../images/IMAGE.png" class="gallery-image" alt="sample image" />'
          }
  }

}
