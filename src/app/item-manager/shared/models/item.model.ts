export enum typeEnum {
  title = 'title',
  description = 'description',
  price = 'price',
  email = 'email',
  undefined = ''
}

export class Item {
  title: string;
  description: string;
  price: number | string;
  email: string;
  image: string;
  fav?: boolean;

  constructor(init?: Item | Partial<Item>) {
    if (init == null) { return; }
    init.price = parseInt(init.price as string, 10);

    Object.assign(this, init);
  }
}
