import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as CKEditor from '@ckeditor/ckeditor5-angular';
//import * as Essentials from '@ckeditor/ckeditor5-essentials';
import * as Essentials from '@ckeditor/ckeditor5-build-decoupled-document';
//import * as Paragraph from '@ckeditor/ckeditor5-paragraph';
import * as Paragraph from '@ckeditor/ckeditor5-build-decoupled-document';
import * as Bold from '@ckeditor/ckeditor5-build-decoupled-document';
import * as Italic from '@ckeditor/ckeditor5-build-decoupled-document';
//import * as Pagination from '@ckeditor/ckeditor5-pagination';
//import  * as Heading from '@ckeditor/ckeditor5-heading';
import * as Heading from '@ckeditor/ckeditor5-build-decoupled-document';
import * as BlockQuote from '@ckeditor/ckeditor5-build-decoupled-document';
import * as Font from '@ckeditor/ckeditor5-build-decoupled-document';
import * as List from '@ckeditor/ckeditor5-build-decoupled-document';
import * as Table from '@ckeditor/ckeditor5-build-decoupled-document';
import * as TableProperties from '@ckeditor/ckeditor5-build-decoupled-document';
import * as TableCellProperties from '@ckeditor/ckeditor5-build-decoupled-document';
import * as TableToolbar from '@ckeditor/ckeditor5-build-decoupled-document';
import * as Pagination from '@ckeditor/ckeditor5-build-decoupled-document';
import * as PageBreak from '@ckeditor/ckeditor5-build-decoupled-document';
import * as ExportPdf from '@ckeditor/ckeditor5-build-decoupled-document';
import * as ExportWord from '@ckeditor/ckeditor5-build-decoupled-document';
import * as CloudServices from '@ckeditor/ckeditor5-build-decoupled-document';
//import { ConsoleReporter } from 'jasmine';
//import { error } from 'console';




@Component({
  selector: 'app-ckeditor-page',
  templateUrl: './ckeditor-page.component.html',
  styleUrls: ['./ckeditor-page.component.css']
})
export class CkeditorPageComponent implements OnInit {

  public Editor = DecoupledEditor;
  public data = "Hello!";
  dadosSalvo = '';
  list = [];
  public docTemplate: any;


  public Config = {

    Plugins: [
      Essentials, Paragraph, Bold, Heading, Italic, Font,
      BlockQuote, List, Table, TableProperties, TableCellProperties, TableToolbar, PageBreak,
      Pagination, ExportPdf, ExportWord
    ],

    toolbar: {
      items: [

        /* 'exportPdf',
          'exportWord',
          '|',
         'previousPage',
          'nextPage',
          'pageNavigation',
          'pageBreak',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
         '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'blockQuote',
         'bulletedList',
          'numberedList',
          'insertTable'*/

        'heading', '|',
        'alignment', '|',
        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'link', '|',
        'bulletedList', 'numberedList', 'todoList',
        '-', // break point
        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'outdent', 'indent', '|',
        'uploadImage', 'blockQuote', '|',
        'undo', 'redo', '|',
        'previousPage',
        'nextPage',
        'pageNavigation',
        'pageBreak'
      ]
    },


    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },


    pagination: {
      // Page width and height correspond to A4 format
      pageWidth: '21cm',
      pageHeight: '29.7cm',

      pageMargins: {
        top: '20mm',
        bottom: '20mm',
        right: '12mm',
        left: '12mm'
      }
    },
    exportPdf: {

      fileName: 'my-file.pdf',
      converterOptions: {
        format: 'A4',
        margin_top: '20mm',
        margin_bottom: '20mm',
        margin_right: '12mm',
        margin_left: '12mm',
        page_orientation: 'portrait'
      }
    },
    exportWord: {

      fileName: 'my-sample-file.docx',
      converterOptions: {
        format: 'A4',
        margin_top: '20mm',
        margin_bottom: '20mm',
        margin_right: '12mm',
        margin_left: '12mm'
      }
    },
    language: 'en',
    licenseKey: 'HAsEsrrAGxPZtGag8bP1p46aMo3YZrI9en4jlp2NOqOGYBL+HPt7Nncb8w=='
  };

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getTemplating();
  }

  getTemplating() {
    this.api.getAll().subscribe((response: any) => {
      this.list = response;
      console.log('Sucess', response);
      this.docTemplate = response[0];
      this.data = response[0].template;
    }, error => {
      console.log('error getting templating');
    })
  }

  salvar() {
    this.docTemplate.template = this.data;
    console.log('my template: ',this.docTemplate );
    this.api.create(this.docTemplate).subscribe((response: any) => {
      console.log('dados salvo com sucesso', response);
    }, error => {
      console.log('erro ao salvar o templating', error);
    }
    )
    // this.dadosSalvo = this.data;
  }

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement(),
      //editor.ui.update()
      //editor.execute('exportPdf')
      //editor.ui.toolbar.pagination
    );
  }


  public onChange({ editor }: ChangeEvent) {
    this.data = editor.getData();
    console.log(this.data);
  }

}
