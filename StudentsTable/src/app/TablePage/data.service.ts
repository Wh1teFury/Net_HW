export interface DataConfig {
  [k: string]: boolean | number | string;
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  birthday: string;
  GPA: number;
  delete: boolean;
  show: boolean;
}

export class DataService {
  private data: DataConfig[] = [
    { id: 1, name: "Степан", surname: "Кулагин", patronymic: "Владимирович", birthday: "20.09.1995", GPA: 3.1, delete: false, show: false },
    { id: 2, name: "Варлам", surname: "Русаков", patronymic: "Алексеевич", birthday: "15.11.1998", GPA: 4.8, delete: false, show: false },
    { id: 3, name: "Леонард", surname: "Харитонов", patronymic: "Игоревич", birthday: "11.12.1997", GPA: 5.0, delete: false, show: false },
    { id: 4, name: "Тимофей", surname: "Афанасьев", patronymic: "Филатович", birthday: "09.01.1996", GPA: 2.9, delete: false, show: false },
    { id: 5, name: "Борис", surname: "Журавлев", patronymic: "Тимофеевич", birthday: "18.03.1991", GPA: 3.5, delete: false, show: false },
    { id: 6, name: "Игнатий", surname: "Носков", patronymic: "Андреевич", birthday: "29.07.1992", GPA: 4.1, delete: false, show: false },
    { id: 7, name: "Игорь", surname: "Гуляев", patronymic: "Васильевич", birthday: "05.05.1993", GPA: 4.8, delete: false, show: false },
    { id: 8, name: "Нинель", surname: "Авдеев", patronymic: "Михайлович", birthday: "07.04.1995", GPA: 3.9, delete: false, show: false },
    { id: 9, name: "Дарина", surname: "Степанова", patronymic: "Егоровна", birthday: "21.09.1996", GPA: 3.5, delete: false, show: false },
    { id: 10, name: "Аделина", surname: "Одинцова", patronymic: "Федотовна", birthday: "14.08.1997", GPA: 3.6, delete: false, show: false },
    { id: 11, name: "Лидия", surname: "Максимова", patronymic: "Сергеевна", birthday: "12.07.1998", GPA: 3.8, delete: false, show: false },
    { id: 12, name: "Андриана", surname: "Громова", patronymic: "Романовна", birthday: "16.02.1999", GPA: 2.8, delete: false, show: false },
    { id: 13, name: "Лунара", surname: "Ситникова", patronymic: "Кирилловна", birthday: "04.03.1990", GPA: 4.9, delete: false, show: false },
    { id: 14, name: "Анастасия", surname: "Ширяева", patronymic: "Сергеевна", birthday: "01.08.1998", GPA: 5.0, delete: false, show: false },
  ];

  getData(): DataConfig[] {
    return this.data;
  }
}
