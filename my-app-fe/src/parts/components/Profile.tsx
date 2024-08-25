import { Avatar, Typography, Box } from '@mui/material';

interface ProfileProps {
  name: string;
  imageUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ name, imageUrl }) => {
  return (
    <Box display="flex" alignItems="center" className="p-4">
      <Avatar alt={name} src={imageUrl} sx={{ width: 56, height: 56, marginRight: 2 }} />
      <Typography variant="h5" fontWeight="semibold" align="left">
        Welcome, {name}
      </Typography>
    </Box>
  );
};

export default Profile;
