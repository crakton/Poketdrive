import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AuthService, {
	LoginDTO,
	OTPVerificationDTO,
	RegisterDTO,
} from "../../services/authService";
import { baseUrl } from "../../utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define auth state interface
interface AuthState {
	token: string | null;
	user: any | null;
	isFirstTime: boolean;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

// Initial state
const initialState: AuthState = {
	token: null,
	user: null,
	isFirstTime: true,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};

// Async thunks for authentication actions
export const loadUser = createAsyncThunk(
	"auth/loadUser",
	async (_, { rejectWithValue }) => {
		try {
			const token = await AuthService.getToken();
			if (!token) {
				return rejectWithValue("No token found");
			}

			// Set the token in axios defaults
			await AuthService.setAuthToken(token);

			// Get user data from storage
			const userData = await AuthService.getUser();

			// Check if it's first time
			const isFirstTime = await AuthService.isFirstTime();

			return { token, user: userData, isFirstTime };
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const register = createAsyncThunk(
	"auth/register",
	async (registerData: RegisterDTO, { rejectWithValue }) => {
		try {
			const response = await fetch(`${baseUrl}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(registerData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData.message || "Registration failed");
			}

			return await response.json();
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async (loginData: LoginDTO, { rejectWithValue }) => {
		try {
			const response = await fetch(`${baseUrl}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData.message || "Login failed");
			}

			const responseData = await response.json();

			// Store token and user data - FIXED ACCESS PATH
			if (responseData.tokens.access.token) {
				await AuthService.setAuthToken(responseData.tokens.access.token);
				await AuthService.saveUser(responseData.user);
			}

			return responseData;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);
export const requestOTP = createAsyncThunk(
	"auth/requestOTP",
	async (email: string, { rejectWithValue }) => {
		try {
			const response = await fetch(`${baseUrl}/auth/send-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData.message || "Failed to send OTP");
			}

			// Store email temporarily
			await AsyncStorage.setItem("email", email);

			return await response.json();
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);
export const verifyOTP = createAsyncThunk(
	"auth/verifyOTP",
	async (data: OTPVerificationDTO, { rejectWithValue }) => {
		try {
			const response = await fetch(`${baseUrl}/auth/verify-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData.message || "OTP verification failed");
			}

			const responseData = await response.json();

			// Store token and user data - MAKE SURE THIS MATCHES YOUR API RESPONSE
			if (responseData.tokens && responseData.tokens.access.token) {
				await AuthService.setAuthToken(responseData.tokens.access.token);
				await AuthService.saveUser(responseData.user);
			}

			return responseData;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			await AuthService.logout();
			return null;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

// Create the auth slice
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setFirstTimeUser: (state, action: PayloadAction<boolean>) => {
			state.isFirstTime = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Load user
		builder
			.addCase(loadUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.token = action.payload.token;
				state.user = action.payload.user;
				state.isAuthenticated = true;
				state.isFirstTime = action.payload.isFirstTime;
			})
			.addCase(loadUser.rejected, (state) => {
				state.isLoading = false;
				state.token = null;
				state.user = null;
				state.isAuthenticated = false;
			});

		// Register
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});

		// Login
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});

		// Request OTP
		builder
			.addCase(requestOTP.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(requestOTP.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(requestOTP.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});

		// Verify OTP
		builder
			.addCase(verifyOTP.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(verifyOTP.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.token = action.payload.token;
				state.user = action.payload.user;
			})
			.addCase(verifyOTP.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});

		// Logout
		builder.addCase(logout.fulfilled, (state) => {
			state.token = null;
			state.user = null;
			state.isAuthenticated = false;
		});
	},
});

export const { setFirstTimeUser } = authSlice.actions;
export default authSlice.reducer;
