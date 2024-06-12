import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Get a single piece of local data from AsyncStorage.
 * @param key The key of the data to retrieve. Defaults to "token" if not provided.
 * @returns The value associated with the provided key, or null if an error occurs.
 */
export const getLocalData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error("Error reading value:", error);
    return null;
  }
};

/**
 * Get all local data stored in AsyncStorage.
 * @returns An object containing all stored data, or null if an error occurs.
 */
export const getAllLocalData = async (): Promise<{
  [key: string]: string | object | null;
} | null> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(keys);
    const formattedData: { [key: string]: string | object | null } = {};

    allData.forEach(([key, value]) => {
      formattedData[key] = key === "user" ? JSON.parse(value || "{}") : value;
    });

    return formattedData;
  } catch (error) {
    console.error("Error reading all local data:", error);
    return null;
  }
};

/**
 * Clear all locally stored data in AsyncStorage.
 * This function removes specific keys related to user data.
 * Note: Modify the keys array as needed to match your application's data structure.
 */
export const clearAllLocalData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(["user", "user_id", "token", "res"]);
  } catch (error) {
    console.error("Error clearing all local data:", error);
  }
};

/**
 * Set a piece of local data in AsyncStorage.
 * @param key The key under which to store the data.
 * @param value The value to store.
 * @param onSet Optional callback function to execute after setting the data.
 */

export const setLocalData = async (
  key: string,
  value: string,
  onSet?: () => void
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
    if (onSet) {
      onSet();
    }
  } catch (error) {
    console.error("Error setting local data:", error);
  }
};

/**
 * Remove a specific piece of local data from AsyncStorage.
 * @param key The key of the data to remove.
 */
export const removeLocalData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing local data:", error);
  }
};

