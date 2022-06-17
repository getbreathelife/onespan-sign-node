import { Nullable } from '../../utils';

/** @public */
export interface Image {
  src: string;
  link: Nullable<string>;
  logoAltTextKey: Nullable<string>;
}

/** @public */
export interface Style {
  color: Nullable<string>;
  backgroundColor: Nullable<string>;
}

/** @public */
export interface TitleBarOptions {
  title: boolean;
  progressBar: boolean;
}

/** @public */
export interface GlobalActionsOptions {
  download: boolean;
  saveAsLayout: boolean;
  hideEvidenceSummary: boolean;
  confirm: boolean;
}

/** @public */
export interface HeaderOptions {
  feedback: boolean;
  breadcrumbs: boolean;
  globalNavigation: boolean;
  sessionBar: boolean;

  globalActions: Nullable<GlobalActionsOptions>;
  titleBar: Nullable<TitleBarOptions>;
}

/** @public */
export interface BrandingBarOptions {
  logo: Nullable<Image>;
}

/** @public */
export interface FooterOptions {
  download: boolean;
  saveAsLayout: boolean;
  hideEvidenceSummary: boolean;
  confirm: boolean;
}

/** @public */
export interface LayoutOptions {
  iframe: boolean;
  navigator: boolean;

  header: Nullable<HeaderOptions>;
  brandingBar: Nullable<BrandingBarOptions>;
  footer: Nullable<FooterOptions>;
}

/** @public */
export interface LayoutStyle {
  brandingBar: Nullable<Image>;
  dialog: Nullable<Style>;
  toolbar: Nullable<Style>;
  titleBar: Nullable<Style>;
}
