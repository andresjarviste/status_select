import type {
  OrderedStatusElement,
  StatusData,
  StatusElement,
  Statuses,
} from "../interfaces/status";
async function getStatus(filter?: string): Promise<Statuses | null> {
  let fetchUrl = "/api/status";
  if (filter) {
    fetchUrl += "?filter=" + filter;
  }
  const response = await fetch(fetchUrl);
  if (!response.ok) {
    console.log("Error loading");
    return null;
  }
  const result: StatusData = await response.json();
  const statusesArray = result.data as Array<StatusElement>;
  const statuses: Statuses = {};
  statusesArray.forEach((elem, index) => {
    statuses[elem.status_id] = {
      ...elem,
      order: index,
    } as OrderedStatusElement;
  });
  return statuses;
}

export { getStatus };
