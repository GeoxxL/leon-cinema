import { useState } from "react";
import { ButtonBase, styled, Typography, Box } from "@mui/material";


const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'flex',
    height: 100,
    width: 100,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));


export default function Salas() {
    const [imagen, setImagen] = useState()


    const convertirABase64 = (archivos) => {
        Array.from(archivos).forEach(archivo => {
            var reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload = function () {
                var base64 = reader.result;
                setImagen(base64)
            }
        })
    }

    return (
        <>
            <div style={{ width: 200 }}>
                <input type="file" accept="image/*" multiple onChange={(e) => convertirABase64(e.target.files)} />
                {imagen ?
                    <Box>
                        <ImageButton
                            focusRipple
                            style={{
                                height: "inherit",
                                width: "min-content",
                                position: "inherit",
                            }}
                        >
                            <ImageSrc style={{ backgroundImage: `url(${imagen})` }} />
                            <Image>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}
                                >
                                    gero un picante
                                </Typography>
                            </Image>
                        </ImageButton>
                    </Box> :
                    <div>Espere...</div>}
            </div>
        </>
    );
};