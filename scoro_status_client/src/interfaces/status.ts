export type StatusElement = {
  status_id: string;
  status_name: string;
  color: string;
  module: string;
  is_default: number;
  modified_date: string;
};

export type StatusData = {
  data: Array<StatusElement>;
};

export type OrderedStatusElement = StatusElement & {
  order: number;
};

export type Statuses = {
  [key: string]: OrderedStatusElement;
};
