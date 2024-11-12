const Menu = require('../data_model/menu');
const Drink = require('../data_model/drink');

const menu = async (req, res) => {
  try {
    const items = await Menu.find({ available: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the menu.' });
  }
};

const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findOne({ _id: id, available: true });
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the menu item.' });
  }
};

const allmenu = async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the menu.' });
  }
};

const getAllMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the menu item.' });
  }
};

const addMenu = async (req, res) => {
  try {
    const { name, description, price, withDrink, category, available, provideTime } = req.body;
    const newMenu = new Menu({
      name,
      description,
      price,
      withDrink,
      category: category.toLowerCase(),
      available,
      provideTime,
    });
    const savedMenu = await newMenu.save();
    res.status(201).json({ id: savedMenu._id, menu: savedMenu });
  } catch (error) {
    res.status(400).json({ error: 'Error adding menu item.' });
  }
};

const editMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, withDrink, category, available, provideTime } = req.body;
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        withDrink,
        category: category.toLowerCase(),
        available,
        provideTime,
      },
      { new: true }
    );
    if (!updatedMenu) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }
    res.json({ id: updatedMenu._id, menu: updatedMenu });
  } catch (error) {
    res.status(400).json({ error: 'Error editing menu item.' });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenu = await Menu.findByIdAndDelete(id);
    if (!deletedMenu) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting menu item.' });
  }
};

const disableMenu = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedMenu = await Menu.findById(id);
    if (!updatedMenu) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }
    updatedMenu.available = !updatedMenu.available;
    updatedMenu = await updatedMenu.save();
    res.json(updatedMenu);
  } catch (error) {
    res.status(400).json({ error: 'Error disabling menu item.' });
  }
};

const getDrinks = async (req, res) => {
  try {
    const drinks = await Drink.find({ available: true });
    res.json(drinks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching drinks.' });
  }
};

const getDrinkById = async (req, res) => {
  try {
    const { id } = req.params;
    const drinkItem = await Drink.findOne({ _id: id, available: true });
    if (!drinkItem) {
      return res.status(404).json({ error: 'Drink not found.' });
    }
    res.json(drinkItem);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the drink.' });
  }
};

const getAllDrinks = async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.json(drinks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching drinks.' });
  }
};

const getAllDrinkById = async (req, res) => {
  try {
    const { id } = req.params;
    const drinkItem = await Drink.findById(id);
    if (!drinkItem) {
      return res.status(404).json({ error: 'Drink not found.' });
    }
    res.json(drinkItem);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the drink.' });
  }
};

const addDrink = async (req, res) => {
  try {
    const { name, description, price, priceWithSet, available, provideTime } = req.body;
    const newDrink = new Drink({
      name,
      description,
      price,
      priceWithSet,
      available,
      provideTime,
    });
    const savedDrink = await newDrink.save();
    res.status(201).json({ id: savedDrink._id, drink: savedDrink });
  } catch (error) {
    res.status(400).json({ error: 'Error adding drink.' });
  }
};

const editDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, priceWithSet, available, provideTime } = req.body;
    const updatedDrink = await Drink.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        priceWithSet,
        available,
        provideTime,
      },
      { new: true }
    );
    if (!updatedDrink) {
      return res.status(404).json({ error: 'Drink not found.' });
    }
    res.json({ id: updatedDrink._id, drink: updatedDrink });
  } catch (error) {
    res.status(400).json({ error: 'Error editing drink.' });
  }
};

const deleteDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDrink = await Drink.findByIdAndDelete(id);
    if (!deletedDrink) {
      return res.status(404).json({ error: 'Drink not found.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting drink.' });
  }
};

const disableDrink = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedDrink = await Drink.findById(id);
    if (!updatedDrink) {
      return res.status(404).json({ error: 'Drink not found.' });
    }
    updatedDrink.available = !updatedDrink.available;
    updatedDrink = await updatedDrink.save();
    res.json(updatedDrink);
  } catch (error) {
    res.status(400).json({ error: 'Error disabling drink.' });
  }
};

module.exports = {
  menu,
  getMenuById,
  addMenu,
  editMenu,
  deleteMenu,
  disableMenu,
  getDrinks,
  getDrinkById,
  addDrink,
  editDrink,
  deleteDrink,
  disableDrink,
  allmenu,
  getAllMenuById,
  getAllDrinks,
  getAllDrinkById
};