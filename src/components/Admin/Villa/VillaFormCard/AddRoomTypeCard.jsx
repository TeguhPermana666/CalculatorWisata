import {
  Box,
  Text,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  useToast,
  HStack,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useAdminVillaContext } from "../../../../context/Admin/AdminVillaContext";
import {
  apiPostVillaRooms,
  apiPutVillaRooms,
  apiDeleteVillaRooms,
} from "../../../../services/villaService";
import toastConfig from "../../../../utils/toastConfig";

const AddRoomTypeCard = (props) => {
  const toast = useToast();
  const { getRoomTypeSelect } = useAdminVillaContext();

  const isEdit = props.isEdit;
  const id_villa = props.id_villa;

  const handleGetRoomTypeSelect = async () => {
    const res = await getRoomTypeSelect(id_villa);
    setRoomList(res.filter((room) => room.id_villa === id_villa));
  };

  const [roomList, setRoomList] = useState(
    isEdit && props.roomType?.length
      ? props.roomType.map((room) => ({
          idRoom: room.id,
          name: room.label,
          extrabed_price: room.extrabed_price || "",
          contract_limit: room.contract_limit || "",
          id_villa,
        }))
      : [
          {
            name: "",
            extrabed_price: "",
            contract_limit: "",
            id_villa,
          },
        ]
  );

  const handleAddNewForm = () => {
    setRoomList((prev) => [
      ...prev,
      {
        name: "",
        extrabed_price: "",
        contract_limit: "",
        id_villa,
      },
    ]);
  };

  const handleFieldChange = (index, field, value) => {
    const newList = [...roomList];
    newList[index][field] = value;
    setRoomList(newList);
  };

  const handleSaveRoom = async (room) => {
    try {
      let res;
      if (isEdit && room.id) {
        res = await apiPutVillaRooms(room.id, room);
      } else {
        res = await apiPostVillaRooms(room);
      }

      if (res.status === 201 || res.status === 200) {
        toast(
          toastConfig(
            "Sukses",
            isEdit
              ? "Tipe kamar berhasil diperbarui"
              : "Tipe kamar berhasil dibuat",
            "success"
          )
        );
        await handleGetRoomTypeSelect(); // refresh
      } else {
        toast(toastConfig("Gagal", "Gagal menyimpan tipe kamar", "error"));
      }
    } catch (error) {
      console.error(error);
      toast(toastConfig("Error", "Terjadi kesalahan server", "error"));
    }
  };

  const handleDeleteRoom = async (room, index) => {
    if (isEdit && room.id) {
      try {
        const res = await apiDeleteVillaRooms(room.id);
        if (res.status === 200) {
          toast(
            toastConfig("Sukses", "Tipe kamar berhasil dihapus", "success")
          );
          await handleGetRoomTypeSelect();
        } else {
          toast(toastConfig("Gagal", "Gagal menghapus tipe kamar", "error"));
        }
      } catch (error) {
        console.error(error);
        toast(toastConfig("Error", "Terjadi kesalahan saat hapus", "error"));
      }
    } else {
      const newList = [...roomList];
      newList.splice(index, 1);
      setRoomList(newList);
    }
  };

  useEffect(() => {
    if (isEdit) {
      handleGetRoomTypeSelect();
    }
  }, [isEdit]);

  return (
    <Box bg="gray.700" p={4} rounded="md" mb={4}>
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="bold" fontSize="18px" color="white">
          {isEdit ? "Edit Tipe Kamar" : "Tambah Tipe Kamar"}
        </Text>
        <IconButton
          icon={<AddIcon />}
          aria-label="Tambah Tipe Kamar"
          size="sm"
          colorScheme="green"
          onClick={handleAddNewForm}
        />
      </HStack>

      {roomList.map((room, index) => (
        <Box
          key={index}
          bg="gray.600"
          p={3}
          rounded="md"
          mb={4}
          display={"flex"}
          gap={2}
          flexDirection={"column"}
        >
          <Flex p={"0.2"} w={"full"} justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>Room Type</Text>
            {
              <IconButton
                icon={isEdit ? <DeleteIcon /> : <CloseIcon />}
                aria-label="Hapus"
                size="sm"
                color="white"
                variant={"unstyled"}
                background={"red.300"}
                onClick={() => handleDeleteRoom(room, index)}
              />
            }
          </Flex>

          <Input
            placeholder="Nama tipe kamar"
            size="sm"
            mb={2}
            value={room.name}
            onChange={(e) => handleFieldChange(index, "name", e.target.value)}
          />

          <NumberInput
            size="sm"
            mb={2}
            value={room.extrabed_price}
            onChange={(val) =>
              handleFieldChange(index, "extrabed_price", parseInt(val))
            }
          >
            <NumberInputField placeholder="Harga extrabed" />
          </NumberInput>

          <Input
            type="date"
            size="sm"
            mb={2}
            value={room.contract_limit}
            onChange={(e) =>
              handleFieldChange(index, "contract_limit", e.target.value)
            }
          />

          <Button
            size="sm"
            mt={2}
            w="full"
            colorScheme="teal"
            onClick={() => handleSaveRoom(room, index)}
          >
            {isEdit ? "Simpan Perubahan" : "Simpan Tipe Kamar"}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default AddRoomTypeCard;
