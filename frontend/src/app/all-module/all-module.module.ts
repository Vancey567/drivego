import {NgModule} from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';

import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {FormsModule} from '@angular/forms';
import {MessageModule} from 'primeng/message';

import {HttpClientModule} from '@angular/common/http';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PasswordModule} from 'primeng/password';
import {InputMaskModule} from 'primeng/inputmask';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {SpeedDialModule} from 'primeng/speeddial';
import {MenuModule} from 'primeng/menu';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ListboxModule} from 'primeng/listbox';

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SidebarModule} from 'primeng/sidebar';
import {AccordionModule} from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';

const all = [
  // FlexLayoutModule,
  ReactiveFormsModule,
  ButtonModule,
  MenubarModule,
  InputTextModule,
  ConfirmDialogModule,
  MessagesModule,
  CardModule,
  CheckboxModule,
  DividerModule,
  FormsModule,
  HttpClientModule,
  KeyFilterModule,
  MessageModule,
  DialogModule,
  ProgressSpinnerModule,
  PasswordModule,
  InputMaskModule,
  AvatarModule,
  AvatarGroupModule,
  SpeedDialModule,
  MenuModule,
  SplitButtonModule,
  ListboxModule,
  TableModule,
  ToastModule,
  CalendarModule,
  SliderModule,
  MultiSelectModule,
  ContextMenuModule,
  DropdownModule,
  ProgressBarModule,
  FileUploadModule,
  ToolbarModule,
  RatingModule,
  RadioButtonModule,
  InputNumberModule,
  InputTextareaModule,
  OverlayPanelModule,
  SidebarModule,
  AccordionModule,
  ChipModule
]

@NgModule({
  declarations: [],
  imports: [all],
  exports: [all],
})

export class AllModuleModule {}
