import DocumentSignedEvent from './documentSigned';
import DocumentViewedEvent from './documentViewed';
import EmailBounceEvent from './emailBounce';
import KbaFailureEvent from './kbaFailure';
import PackageActivateEvent from './packageActivate';
import PackageArchiveEvent from './packageArchive';
import PackageAttachmentEvent from './packageAttachment';
import PackageCompleteEvent from './packageComplete';
import PackageCreateEvent from './packageCreate';
import PackageDeactivateEvent from './packageDeactivate';
import PackageDeclineEvent from './packageDecline';
import PackageDeleteEvent from './packageDelete';
import PackageExpireEvent from './packageExpire';
import PackageReadyForCompleteEvent from './packageReadyForComplete';
import PackageRestoreEvent from './packageRestore';
import PackageTrashEvent from './packageTrash';
import RoleReassignEvent from './roleReassign';
import SignerCompleteEvent from './signerComplete';
import SignerLockedEvent from './signerLocked';
import TemplateCreateEvent from './templateCreate';

/**
 * Event interfaces keyed by their respective event name.
 * @public
 */
type InterfaceMap = {
  DOCUMENT_SIGNED: DocumentSignedEvent;
  DOCUMENT_VIEWED: DocumentViewedEvent;
  EMAIL_BOUNCE: EmailBounceEvent;
  KBA_FAILURE: KbaFailureEvent;
  PACKAGE_ACTIVATE: PackageActivateEvent;
  PACKAGE_ARCHIVE: PackageArchiveEvent;
  PACKAGE_ATTACHMENT: PackageAttachmentEvent;
  PACKAGE_COMPLETE: PackageCompleteEvent;
  PACKAGE_CREATE: PackageCreateEvent;
  PACKAGE_DEACTIVATE: PackageDeactivateEvent;
  PACKAGE_DECLINE: PackageDeclineEvent;
  PACKAGE_DELETE: PackageDeleteEvent;
  PACKAGE_EXPIRE: PackageExpireEvent;
  PACKAGE_READY_FOR_COMPLETE: PackageReadyForCompleteEvent;
  PACKAGE_RESTORE: PackageRestoreEvent;
  PACKAGE_TRASH: PackageTrashEvent;
  ROLE_REASSIGN: RoleReassignEvent;
  SIGNER_COMPLETE: SignerCompleteEvent;
  SIGNER_LOCKED: SignerLockedEvent;
  TEMPLATE_CREATE: TemplateCreateEvent;
};

export type {
  InterfaceMap,
  DocumentSignedEvent,
  DocumentViewedEvent,
  EmailBounceEvent,
  KbaFailureEvent,
  PackageActivateEvent,
  PackageArchiveEvent,
  PackageAttachmentEvent,
  PackageCompleteEvent,
  PackageCreateEvent,
  PackageDeactivateEvent,
  PackageDeclineEvent,
  PackageDeleteEvent,
  PackageExpireEvent,
  PackageReadyForCompleteEvent,
  PackageRestoreEvent,
  PackageTrashEvent,
  RoleReassignEvent,
  SignerCompleteEvent,
  SignerLockedEvent,
  TemplateCreateEvent,
};
