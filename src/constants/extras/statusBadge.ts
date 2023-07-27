const commonStyle: any = {
    borderRadius: "5px",
    padding: "4px 4px",
    textAlign: "center",
    width: "auto",
    fontSize: "80%",
    fontWeight: "500",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
};

const success: any = {
    backgroundColor: "#E7FAE3",
    color: "#2D6040",
    border: "1px solid #E7FAE3",
};

const failed: any = {
    backgroundColor: "#F5CFD3",
    color: "#671A21",
    border: "1px solid  #F5CFD3",
};

export const handleStatusBadge = (status: any) => {
    if (status) {
        switch (status) {
            case "success":
                return { ...commonStyle, ...success }
            case "failed":
                return { ...commonStyle, ...failed }
            default:
                return commonStyle
        }
    }
}