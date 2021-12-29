import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: "Emoji"
})
export class EmojiPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 5) {
      return `<div>${value}</div><div><img src="../../../assets/devil.png"></div>`;
    } if (value >= 4 && value < 5) {
      return `<div>${value}</div><div><img src="../../../assets/cool.png"></div>`;
    } if (value >= 3 && value < 4) {
      return `<div>${value}</div><div><img src="../../../assets/lemon.png"></div>`;
    }
      return `<div>${value}</div><div><img src="../../../assets/scared.png"></div>`;

  }
}

@Pipe({
  name: "Age"
})
export class AgePipe implements PipeTransform {
  transform(value: string): string {
    const currentDate = new Date();
    const arrayDate = value.split(".");
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const birthday = new Date(+arrayDate[2], +arrayDate[1], +arrayDate[0]);
    const birthnow = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    let age = today.getFullYear() - birthday.getFullYear();

    if (today < birthnow) {
      age = age - 1;
      return `${value} (${age} y.o)`;
    }
    return `${value} (${age} y.o)`;
  }
}
