import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ModalController, NavController} from '@ionic/angular';
import {NavigationOptions} from '@ionic/angular/providers/nav-controller';
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
    private userService: UserService,
    public actionSheetController: ActionSheetController
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

  async presentActionSheet(noteId: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Ver',
          icon: 'eye-outline',
          handler: () => {
            this.viewNote(noteId);
          }
        },
        {
          text: 'Borrar',
          icon: 'trash',
          handler: () => {
            this.delete(noteId);
          }
        },
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => {
            const options: NavigationOptions = {
              queryParams: {
                noteId
              }
            };
            this.navController.navigateForward(['/edit'], options);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();

    const {role} = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
