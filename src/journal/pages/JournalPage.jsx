import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteViews, NothingSelectedViwes } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/journal/thunks"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote } from "../../store/journal"

export const JournalPage = () => {

    const { isSaving, active } = useSelector( state => state.journal );

    const dispatch = useDispatch();

    const onClickNewNote = () => {
       dispatch(startNewNote() );

    }

   




  return (
  <JournalLayout>

    {
       (!!active)
       ? <NoteViews />
       : <NothingSelectedViwes />
    }
  
    <IconButton
    onClick={ onClickNewNote }
    size='large'
    disabled={ isSaving }
    sx={{
      color: 'white',
      backgroundColor: 'error.main',
      ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
      position: 'fixed',
      right: 50,
      bottom: 50
    }}
    >
      <AddOutlined sx={{ fontSize: 30 }}/>     

    </IconButton>
      
  </JournalLayout>
  )
}
