
import React from 'react'

export const getContactMarkdown = ({ contactInfo, fullName = "" }) => {
  const parts = [];
    if (contactInfo.email) parts.push(`${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`[LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`[Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center" classname="text-4xl font-bold">${fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
}

export const getAchievementsMarkdown = (achievements = []) => {
  if (!achievements.length) return "";

  const filtered = achievements.filter(
    (item) => item && item.trim().length > 0
  );

  if (!filtered.length) return "";

  return `## Achievements\n\n${filtered
    .map((item) => `•${item}`)
    .join("\n\n")}`;
};

export const getPorMarkdown = (positionOfResponsibility = []) => {
  if (!positionOfResponsibility.length) return "";

  const filtered = positionOfResponsibility.filter(
    (item) => item && item.trim().length > 0
  );

  if (!filtered.length) return "";

  return `## Positions of Responsibility\n\n${filtered
    .map((item) => `•${item}`)
    .join("\n\n")}`;
};

export const entriesToMarkdown = (entries, type) => {
  if (!entries?.length) return "";

  return (
    `## ${type}\n\n` +
    entries
      .map((entry) => {
        const dateRange = entry.current
          ? `${entry.startDate} – Present`
          : `${entry.startDate} – ${entry.endDate}`;

        return (
          `### ${entry.title}\n` +
          `_${entry.organization}_ · ${dateRange}\n\n` +
          `${entry.description}`
        );
      })
      .join("\n\n")
  );
};

