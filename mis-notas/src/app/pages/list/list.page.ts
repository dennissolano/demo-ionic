import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ViewNoteComponent} from 'src/app/components/view-note/view-note.component';
import {NoteService} from 'src/app/services/note.service';
import {Note} from 'src/app/types/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService, public modalController: ModalController) {}

  ngOnInit() {
    // Sacamos las notas del servicio de notas
    this.notes = this.noteService.notes;
    console.log(this.notes);
  }

  async viewNote(noteId: number) {
    console.log('note: ' + noteId);
    const modal = await this.modalController.create({
      component: ViewNoteComponent,
      componentProps: {
        noteId
      }
    });
    return await modal.present();
  }

  delete(noteId: number) {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }
}
