export type BaseAppItem = {
  key: string;
  label: string;
  href: string;
};

type SingleAppItem = BaseAppItem & {
  icon: React.ElementType;
};

type ParentAppItem = {
  key: string;
  label: string;
  icon: React.ElementType;
  items: BaseAppItem[];
};

export type NavAppItem = SingleAppItem | ParentAppItem;