import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export const PopoverButton = (props) => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Icon
          icon={"mage:dots"}
          className="text-white text-[24px] p-[4px] cursor-pointer "
          style={{
            background: "#1A202C",
            borderRadius: "6px",
          }}
        />
      </PopoverTrigger>
      <PopoverContent w={"100%"}>
        {props.isOpenButton && (
          <PopoverBody className="cursor-pointer" onClick={props.onOpenButton}>
            Open
          </PopoverBody>
        )}
        <PopoverBody className="cursor-pointer" onClick={props.onEditButton}>
          Edit
        </PopoverBody>
        <PopoverBody className="cursor-pointer" onClick={props.onDeleteButton}>
          Delete
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
