import { Router } from "express";

export interface Routes {
  path: string;
  router: Router;
}

export enum RESPONSE_CODE {
  // Common Responses code
  INVALID_FIELDS,
  USER_NOT_FOUND,
  USER_ALREADY_EXIST,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
  INVALID_PARAMS,
  METHOD_NOT_ALLOWED,
  ORDER_EXISTS,
  UNAUTHORIZED,
  FORBIDDEN,
  SUCCESS,
  INVALID_TOKEN,
  ERROR,
  EMAIL_FAILED_TO_SEND,
  GPT_STYLE_NOT_FOUND,
  HASHNODE_TOKEN_NOT_FOUND,
  HASHNODE_PUB_ID_NOT_FOUND,
  ERROR_TRANSCRIBING_AUDIO,
  ERROR_IDENTIFYING_ACTION,
  ERROR_CONVERTING_TEXT_TO_SPEECH,
  ERROR_CREATING_POST,
  ARTICLE_CREATION_QUEUED,
  ARTICLE_CREATION_FAILED,
  ARTICLE_CREATION_SUCCESS,
  UPDATING_ARTICLE_QUEUED,
  ERROR_GENERATING_COVER_IMAGE,
  ERROR_UPDATING_QUEUE,
  ERROR_GENERATING_CONTENT,
  ERROR_PUBLISHING_ARTICLE,
  ERROR_DELETING_QUEUE,
  CONTENT_NOT_FIND,
  CONTENT_DELETED,
  ERROR_UPDATING_ARTICLE,
  ERROR_FETCHING_ARTICLE,
  ERROR_FINDING_ARTICLE_FOR_UPDATE,
  DELETE_ARTICLE_REQUESTED,
  ERROR_DELETING_ARTICLE,
  BAD_REQUEST,
  NOT_FOUND,
  INVALID_NOTION_PAGE_URL,
  INVALID_OTP,
  PLAN_NOT_FOUND,
  USER_ALREADY_SUBSCRIBED,
  CHECKOUT_ERROR,
  SUBSCRIPTION_NOT_FOUND,
  SUBSCRIPTION_CREATION_FAILED,
}

export interface IReqObject {
  user: {
    id: string | null | undefined;
    email?: string;
    role?: string;
  };
}
