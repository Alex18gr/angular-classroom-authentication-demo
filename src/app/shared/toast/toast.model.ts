export class Toast {
  action: ToastActions;
  notificationType: NotificationTypes;
  title: string;
  message: string;
  delay: number;

  constructor(options: { action: ToastActions,
  notificationType: NotificationTypes,
  title: string,
  message: string,
  delay?: number}) {
    this.action = options.action;
    this.notificationType = options.notificationType;
    this.title = options.title;
    this.message = options.message;
    this.delay = options.delay || 3000;
  }

}

export enum NotificationTypes {
  none,
  info,
  warning,
  danger
}

export enum ToastActions {
  none,
  upload,
  created,
  updated,
  deleted,
  failed,
  new,
  important
}
