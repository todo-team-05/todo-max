const fontWeight = {
  bold: 700,
  medium: 500,
};

const fontSize = {
  large: 24,
  medium: 16,
  regular: 14,
  small: 12,
};

// export const fontSystem = {
//   displayBold24: css`
//     font-size: ${fontSize.large}px;
//     font-weight: ${fontWeight.bold};
//     line-height: auto;
//   `,
//   displayBold16: css`
//     font-size: ${fontSize.medium}px;
//     font-weight: ${fontWeight.bold};
//     line-height: auto;
//   `,
//   displayBold14: css`
//     font-size: ${fontSize.regular}px;
//     font-weight: ${fontWeight.bold};
//     line-height: auto;
//   `,
//   displayBold12: css`
//     font-size: ${fontSize.small}px;
//     font-weight: ${fontWeight.bold};
//     line-height: auto;
//   `,
//   displayMedium16: css`
//     font-size: ${fontSize.medium}px;
//     font-weight: ${fontWeight.medium};
//     line-height: 22px;
//   `,
//   displayMedium14: css`
//     font-size: ${fontSize.regular}px;
//     font-weight: ${fontWeight.medium};
//     line-height: auto;
//   `,
//   displayMedium12: css`
//     font-size: ${fontSize.small}px;
//     font-weight: ${fontWeight.medium};
//     line-height: auto;
//   `,
//   selectedBold16: css`
//     font-size: ${fontSize.medium}px;
//     font-weight: ${fontWeight.bold};
//     line-height: auto;
//   `,
//   selectedBold14: css`
//     font-size: ${fontSize.regular}px;
//     font-weight: ${fontWeight.bold};
//     line-height: auto;
//   `,
//   availableMedium16: css`
//     font-size: ${fontSize.medium}px;
//     font-weight: ${fontWeight.medium};
//     line-height: auto;
//   `,
//   availableMedium14: css`
//     font-size: ${fontSize.regular}px;
//     font-weight: ${fontWeight.medium};
//     line-height: auto;
//   `,
// };

export const fontSystem = {
  displayBold24: {
    fontSize: `${fontSize.large}px`,
    fontWeight: fontWeight.bold,
    lineHeight: "auto",
  },
  displayBold16: {
    fontSize: `${fontSize.medium}px`,
    fontWeight: fontWeight.bold,
    lineHeight: "auto",
  },
  displayBold14: {
    fontSize: `${fontSize.regular}px`,
    fontWeight: fontWeight.bold,
    lineHeight: "auto",
  },
  displayBold12: {
    fontSize: `${fontSize.small}px`,
    fontWeight: fontWeight.bold,
    lineHeight: "auto",
  },
  displayMedium16: {
    fontSize: `${fontSize.medium}px`,
    fontWeight: fontWeight.medium,
    lineHeight: "22px",
  },
  displayMedium14: {
    fontSize: `${fontSize.regular}px`,
    fontWeight: fontWeight.medium,
    lineHeight: "auto",
  },
  displayMedium12: {
    fontSize: `${fontSize.small}px`,
    fontWeight: fontWeight.medium,
    lineHeight: "auto",
  },
  selectedBold16: {
    fontSize: `${fontSize.medium}px`,
    fontWeight: fontWeight.bold,
    lineHeight: "auto",
  },
  selectedBold14: {
    fontSize: `${fontSize.regular}px`,
    fontWeight: fontWeight.bold,
    lineHeight: "auto",
  },
  availableMedium16: {
    fontSize: `${fontSize.medium}px`,
    fontWeight: fontWeight.medium,
    lineHeight: "auto",
  },
  availableMedium14: {
    fontSize: `${fontSize.regular}px`,
    fontWeight: fontWeight.medium,
    lineHeight: "auto",
  },
};

export const theme = {
  ...fontSystem,
};
