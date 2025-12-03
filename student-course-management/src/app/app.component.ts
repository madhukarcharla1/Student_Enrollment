import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'student-course-management';

  constructor() {
    const matIconRegistry = inject(MatIconRegistry);
    const domSanitizer = inject(DomSanitizer);
    matIconRegistry.addSvgIcon(
      'edit',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/edit.svg')
    );
    matIconRegistry.addSvgIcon(
      'delete',
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/delete.svg')
    );
  }
}
