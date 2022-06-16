import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenMessageComponent } from './open-message.component';

const routes: Routes = [{ path: '', component: OpenMessageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OpenMessageRoutingModule {}
