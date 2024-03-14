import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[RemoverEspacos]',
  standalone: true,
})
export class RemoverEspacosDirective {
  constructor(private element: ElementRef<HTMLInputElement>) {}

  @HostListener('keydown', ['$event'])
  public onKeyDown(keyboardEvent: KeyboardEvent): void {
    let stringParaFormatar: string = this.buscarValorCampo();

    let cursorPosition: any = 0;

    cursorPosition = this.element.nativeElement.selectionStart;

    let teclaEspacoPressionada: boolean = keyboardEvent.code == 'Space';

    if (!stringParaFormatar.length && teclaEspacoPressionada) {
      keyboardEvent.preventDefault();
    }

    let posicaoAnteriorAoInputEspaco: boolean =
      stringParaFormatar.slice(cursorPosition - 1, cursorPosition) == ' ';

    if (posicaoAnteriorAoInputEspaco && teclaEspacoPressionada) {
      keyboardEvent.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  public onBlur(): void {
    let stringParaFormatar: string = this.buscarValorCampo();

    let stringFormatada: string = stringParaFormatar
      .replaceAll(/\s+/g, ' ')
      .trim();
    this.setarValorCampo(stringFormatada);
  }

  private buscarValorCampo(): string {
    if (this.element.nativeElement) {
      return this.element.nativeElement.value;
    }
    return '';
  }

  private setarValorCampo(texto: string): void {
    this.element.nativeElement.value = texto;
  }
}
