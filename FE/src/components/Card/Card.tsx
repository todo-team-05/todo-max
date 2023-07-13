import { colors } from "../../constants/colors";

import { Button } from "../Button/Button";
import { CloseButton } from "../Button/CloseButton";
import { EditButton } from "../Button/EditButton";
import { Txt } from "../Txt";

export function DefaultCard({
  cardTitle,
  cardContent,
}: {
  cardTitle: string;
  cardContent: string;
}) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "268px",
        padding: "16px",
        gap: "16px",
        backgroundColor: `${colors.surfaceDefault}`,
        borderRadius: "8px",
        boxShadow: "0px 1px 4px 0px #6E80913D",
      }}>
      <div
        css={{
          display: "flex",
          gap: "4px",
        }}>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            width: "240px",
            gap: "16px",
          }}>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}>
            <div contentEditable="false">
              <Txt typography="displayBold14" color={colors.textStrong}>
                {/* Title */}
                {cardTitle}
              </Txt>
            </div>
            <div contentEditable="false">
              <Txt typography="displayMedium14" color={colors.textDefault}>
                {/* Body */}
                {cardContent}
              </Txt>
            </div>
          </div>
          <div>
            <Txt typography="displayMedium12" color={colors.textWeak}>
              author by web
            </Txt>
          </div>
        </div>
        <div>
          <CloseButton />
          <EditButton />
        </div>
      </div>
      <div
        css={{
          display: "flex",
          gap: "8px",
        }}>
        <Button
          text="Button"
          color={`${colors.textDefault}`}
          backgroundColor={`${colors.surfaceAlt}`}
        />
        <Button
          text="Button"
          color={`${colors.textWhiteDefault}`}
          backgroundColor={`${colors.surfaceBrand}`}
        />
      </div>
    </div>
  );
}
