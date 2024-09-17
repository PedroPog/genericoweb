import { ApplicationRef, Component, effect, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SwithThemeService } from './core/services/utility/swith-theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet/>`,
  styles: [],
})
export class AppComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private sts:SwithThemeService,
    private ref:ApplicationRef
  ){
    const themeInStorage = localStorage.getItem('theme');
    if(!themeInStorage){
      sts.theme.set('device-theme');
    }else{
      sts.theme.set(themeInStorage);
    }

    effect(()=>{
      const theme = sts.theme();
      if(theme == 'device-theme'||!theme){
        const isLightOn = matchMedia('(prefers-color-scheme:light)').matches;
        this.setDeviceTheme(isLightOn);
        matchMedia('(prefers-color-scheme:light)').addEventListener('change',(e)=>{
          this.setDeviceTheme(e.matches);
          ref.tick;
        })
      }else if(theme == 'light-theme'){
        this.document.body.classList.add('light-theme');
        localStorage.setItem('theme','light-theme');
      }else{
        this.document.body.classList.remove('light-theme');
        localStorage.setItem('theme','dark-theme');
      }
    })
  }

  setDeviceTheme(isLightOn:boolean){
    if(isLightOn){
      this.document.body.classList.add('light-theme');
      localStorage.setItem('theme','light-theme');
    }else{
      this.document.body.classList.remove('light-theme');
      localStorage.setItem('theme','dark-theme');
    }
  }
}
