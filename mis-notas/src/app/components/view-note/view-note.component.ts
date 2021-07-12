import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NoteService} from 'src/app/services/note.service';
import {Note} from 'src/app/types/models';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss']
})
export class ViewNoteComponent implements OnInit {
  @Input() noteId: number;
  note: Note;

  constructor(private noteService: NoteService, private modalController: ModalController) {}

  ngOnInit() {
    console.log('onInit');
    this.note = this.noteService.getNoteById(this.noteId);
    console.log(this.note);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
