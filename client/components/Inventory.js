import React from "react";
import { connect } from "react-redux";
import { getInventory, deleteInventory } from "../store/inventory";
import CreateInventory from "./CreateInventory";
import EditInventory from "./EditInventory";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      hasAddForm: false,
      editId: "",
    };
    this.isClicked = this.isClicked.bind(this);
    this.isEditClicked = this.isEditClicked.bind(this);
  }

  componentDidMount() {
    this.props.getInventory();
  }

  isClicked() {
    this.setState({ hasAddForm: true });
  }
  isEditClicked(id) {
    this.setState({ editId: id });
  }
  render() {
    const inventory = this.props.inventory;
    console.log(inventory);
    return (
      <TableContainer component={Paper} className="inventory-table">
        <button type="submit" onClick={this.isClicked}>
          Add Inventory
        </button>
        {this.state.hasAddForm ? <CreateInventory /> : null}
        <Table
          stickyHeader
          aria-label="sticky table"
          className="inventory-admin-access"
        >
          <TableHead>
            <TableRow>
              <TableCell>Product Name </TableCell>
              <TableCell align="right">Picture</TableCell>
              <TableCell align="right">Price ($)</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Remove</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((product) =>
              this.state.editId === product.id ? (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <EditInventory
                    product={product}
                    onClickUpdate={this.isEditClicked}
                  />
                </TableRow>
              ) : (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">
                    <img
                      src={product.imageUrl}
                      className="all-products-thumbnails"
                    />
                  </TableCell>
                  <TableCell align="right">${product.price}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.props.deleteInventory(product.id)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      onClick={() => this.isEditClicked(product.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapState = (state) => {
  return {
    inventory: state.inventory,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getInventory: () => dispatch(getInventory()),
    deleteInventory: (inventory) => dispatch(deleteInventory(inventory)),
  };
};

export default connect(mapState, mapDispatch)(Inventory);
