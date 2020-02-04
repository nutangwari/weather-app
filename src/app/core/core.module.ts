import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CityTileComponent } from './components/city-tile/city-tile.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityTileComponent,
    NavComponent
  ],
  providers: [

  ],
  exports: [
    CityTileComponent,
    NavComponent
  ]
})

export class CoreModule {

}
