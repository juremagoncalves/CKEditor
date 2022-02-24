import { Component, OnInit } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as CKEditor from '@ckeditor/ckeditor5-angular';
//import * as Essentials from '@ckeditor/ckeditor5-essentials';
import * as Essentials from '@ckeditor/ckeditor5-build-decoupled-document';
//import * as Paragraph from '@ckeditor/ckeditor5-paragraph';
import * as Paragraph from '@ckeditor/ckeditor5-build-decoupled-document';
import * as Bold from '@ckeditor/ckeditor5-build-decoupled-document';
import * as Italic  from '@ckeditor/ckeditor5-build-decoupled-document';
import * as Pagination from '@ckeditor/ckeditor5-pagination';


@Component({
  selector: 'app-ckeditor-page',
  templateUrl: './ckeditor-page.component.html',
  styleUrls: ['./ckeditor-page.component.css']
})
export class CkeditorPageComponent implements OnInit {

  public Editor = DecoupledEditor;
  public data = "Hello!";
  //public data = `<textaria> yyyyy </textaria>`;
  dadosSalvo = '';
  

  public Config = {
    // plugins: [
    //   Essentials,Paragraph,Bold,Italic 
    // ],
    // toolbar: [ 'bold', 'italic' ]
    
   // Pagination
  // Plugins:[Pagination]
  };
  constructor() { }

  ngOnInit(): void {
    
  }

  public onReady( editor: any ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}


  public onChange({ editor }: ChangeEvent) {
    this.data = editor.getData();
    console.log(this.data);
  }

}
