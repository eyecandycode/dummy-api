export function timeSince(timeStamp) {
  const now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + " secs ago";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + " mins ago";
  }
  if (secondsPast < 86400) {
    return parseInt(secondsPast / 3600) + " hours ago";
  }
  if (secondsPast <= 2592000) {
    return parseInt(secondsPast / 86400) + " days ago";
  }
  if (secondsPast > 2592000) {
    const day = timeStamp.getDate();
    const month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    const year =
      timeStamp.getFullYear() === now.getFullYear()
        ? ""
        : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}
