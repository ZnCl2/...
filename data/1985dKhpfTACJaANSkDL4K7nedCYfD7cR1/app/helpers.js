export const RouteHelper = (url,address) => {
    let view = 'main',id = null;
    if (url.indexOf('?wrapper') > -1) url = url.split('?wrapper')[0];
    if (url.indexOf('&wrapper') > -1) url = url.split('&wrapper')[0];
    const path = url.split(address + "/")[1];
    if (path.indexOf('?') > -1){
      view = path.split(':')[1];
      if (view.indexOf('+') > -1) view.split('+')[0];
    }
    console.log(view);
    return {view:view,id:id}
}

export const DateHelper = (timeStamp) => {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const date = new Date(timeStamp*1000);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

/*** QUERIES ***/

// site list query

export const SiteListByCategoryQuery = (category) => {
  let q = " SELECT * ";
  q += " FROM site ";
  // q += " WHERE category="+category+" ";
  //q += " ORDER BY site.date_added DESC ";
  return q;
}
