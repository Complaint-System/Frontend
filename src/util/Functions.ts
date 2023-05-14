function formatRelativeDate(dateString: string | Date) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // Convert difference to seconds
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 60) {
    return "just now";
  } else if (diffSeconds < 60 * 60) {
    const minutes = Math.floor(diffSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffSeconds < 60 * 60 * 24) {
    const hours = Math.floor(diffSeconds / (60 * 60));
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffSeconds < 60 * 60 * 24 * 30) {
    const days = Math.floor(diffSeconds / (60 * 60 * 24));
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diffSeconds < 60 * 60 * 24 * 365) {
    const months = Math.floor(diffSeconds / (60 * 60 * 24 * 30));
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffSeconds / (60 * 60 * 24 * 365));
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

function formatRelativeDateOnlyDays(dateString: string | Date) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // Convert difference to seconds
  const diffSeconds = Math.floor(diffMs / 1000);
  if (diffSeconds < 60 * 60 * 24) {
    return `Today`;
  } else if (diffSeconds < 60 * 60 * 24 * 30) {
    const days = Math.floor(diffSeconds / (60 * 60 * 24));
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diffSeconds < 60 * 60 * 24 * 365) {
    const months = Math.floor(diffSeconds / (60 * 60 * 24 * 30));
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffSeconds / (60 * 60 * 24 * 365));
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1; // add 1 to get month index starting from 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const dataConverter = (data: any) => {
  const data1 = data;
  const newData = [];
  for (let index = 0; index < 7; index++) {
    const currentDate = new Date();
    const date = new Date();
    date.setDate(currentDate.getDate() - index);

    if (data1.length === 0) {
      newData.push({
        date: formatRelativeDateOnlyDays(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        ),
        count: 0,
      });
    } else {
      const target = data1[data1.length - 1];
      const targetDate = new Date(
        `${target._id.month}/${target._id.day}/${target._id.year}`
      );
      if (
        targetDate.getDate() === date.getDate() &&
        targetDate.getMonth() === date.getMonth() &&
        targetDate.getFullYear() === date.getFullYear()
      ) {
        data1.pop();
        newData.push({
          date: formatRelativeDateOnlyDays(
            `${target._id.year}-${target._id.month}-${target._id.day}`
          ),
          count: target.count,
        });
      } else
        newData.push({
          date: formatRelativeDateOnlyDays(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          ),
          count: 0,
        });
    }
  }
  return newData;
};

export {
  formatRelativeDate,
  formatDate,
  formatRelativeDateOnlyDays,
  dataConverter,
};
