import { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import { status } from "../data/categories";
import { Box, Toolbar, Typography, Divider } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TicketModal from "./TicketModal";
import axios from "axios";
import baseUrl from "../data/baseUrl";
import { useQueryClient, useMutation } from "react-query";

const putTicket = ({ id, formVal }) => {
  return axios.put(baseUrl + "tickets/" + id + ".json", formVal);
};

const Board = ({ tickets }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [segregatedTickets, setSegregatedTickets] = useState({
    [status.toDo]: tickets.filter((ticket) => ticket.status === status.toDo),
    [status.inProgress]: tickets.filter(
      (ticket) => ticket.status === status.inProgress
    ),
    [status.devComplete]: tickets.filter(
      (ticket) => ticket.status === status.devComplete
    ),
    [status.inQA]: tickets.filter((ticket) => ticket.status === status.inQA),
    [status.done]: tickets.filter((ticket) => ticket.status === status.done),
  });

  useEffect(() => {
    setSegregatedTickets(() => {
      return {
        [status.toDo]: tickets.filter(
          (ticket) => ticket.status === status.toDo
        ),
        [status.inProgress]: tickets.filter(
          (ticket) => ticket.status === status.inProgress
        ),
        [status.devComplete]: tickets.filter(
          (ticket) => ticket.status === status.devComplete
        ),
        [status.inQA]: tickets.filter(
          (ticket) => ticket.status === status.inQA
        ),
        [status.done]: tickets.filter(
          (ticket) => ticket.status === status.done
        ),
      };
    });
  }, [tickets]);

  const viewOrEditTicketHandler = (ticket) => {
    setSelectedCard(ticket);
    setModalOpen(true);
  };

  const queryClient = useQueryClient();
  const { mutate: updateTicket } = useMutation((data) => putTicket(data), {
    onMutate: async (updatedTicket) => {
      await queryClient.cancelQueries(["tickets", updatedTicket.id]);

      const previousTicket = queryClient.getQueryData([
        "tickets",
        updatedTicket.id,
      ]);
      queryClient.setQueryData(
        ["tickets", updatedTicket.id],
        updatedTicket.formVal
      );
      return { previousTicket, updatedTicket };
    },
    onError: (err, updatedTicket, context) => {
      queryClient.setQueryData(
        ["tickets", context.updatedTicket.id],
        context.previousTicket
      );
    },
    onSettled: (updatedTicket) => {
      queryClient.invalidateQueries(["tickets", updatedTicket.id]);
    },
  });

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.droppableId !== result.destination.droppableId) {
      // Todo : Avoid flickering when drag ends
      setSegregatedTickets((prevSegregatedTickets) => {
        const indexOfdndTicket = prevSegregatedTickets[
          result.source.droppableId
        ].findIndex((ticket) => ticket.id === result.draggableId);
        const dndTicket = {
          ...prevSegregatedTickets[result.source.droppableId][indexOfdndTicket],
          status: result.destination.droppableId,
        };
        return {
          ...prevSegregatedTickets,
          [prevSegregatedTickets[result.source.droppableId]]:
            prevSegregatedTickets[result.source.droppableId].splice(
              indexOfdndTicket,
              1
            ),
          [prevSegregatedTickets[result.destination.droppableId]]: [
            ...prevSegregatedTickets[result.destination.droppableId],
            dndTicket,
          ],
        };
      });
      updateTicket({
        id: result.draggableId,
        formVal: {
          ...tickets.find((ticket) => ticket.id === result.draggableId),
          status: result.destination.droppableId,
        },
      });
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Toolbar />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gridGap: "8px",
          }}
        >
          {Object.values(status).map((st) => (
            <Droppable droppableId={st} key={st}>
              {(provided, snapshot) => (
                <Box
                  sx={{
                    backgroundColor: "#f4f5f7",
                    padding: "8px",
                    border: snapshot.isDraggingOver
                      ? "2px dashed #1976d2"
                      : "none",
                    boxSizing: "border-box",
                  }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Typography
                    align="center"
                    component="div"
                    variant="h6"
                    gutterBottom
                  >
                    {st}
                  </Typography>
                  <Divider />
                  {segregatedTickets[st].map((ticket, index) => (
                    <Draggable
                      key={ticket.id}
                      draggableId={ticket.id}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          component="div"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CustomCard
                            ticket={ticket}
                            onClick={() => {
                              viewOrEditTicketHandler(ticket);
                            }}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
      {isModalOpen && (
        <TicketModal
          isModalOpen
          setModalOpen={setModalOpen}
          initialValues={selectedCard}
        />
      )}
    </Box>
  );
};

export default Board;
