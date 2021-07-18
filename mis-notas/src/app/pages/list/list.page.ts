import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {MenuComponent} from 'src/app/components/menu/menu.component';
import {ViewNoteComponent} from 'src/app/components/view-note/view-note.component';
import {NoteService} from 'src/app/services/note.service';
import {UserService} from 'src/app/services/user.service';
import {Note} from 'src/app/types/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {
  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    public modalController: ModalController,
    private navController: NavController,
    private userService: UserService
  ) {}

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

  redirectToCreate() {
    this.navController.navigateForward('/create');
  }

  redirectToLogOut() {
    this.userService.performLogout();
    this.navController.navigateBack('/login');
  }
}
