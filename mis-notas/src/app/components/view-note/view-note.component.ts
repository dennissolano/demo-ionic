import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {NavigationOptions} from '@ionic/angular/providers/nav-controller';
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

  constructor(
    private noteService: NoteService,
    private modalController: ModalController,
    private navController: NavController
  ) {}

  ngOnInit() {
    console.log('onInit');
    this.note = this.noteService.getNoteById(this.noteId);
    console.log(this.note);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  redirectToEditCard() {
    this.closeModal();
    const options: NavigationOptions = {
      queryParams: {
        noteId: this.note.id
      }
    };

    this.navController.navigateForward(['/edit'], options);
  }
}
