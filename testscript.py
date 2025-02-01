import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time

class LibraryPlatformTest(unittest.TestCase):
    def setUp(self):
        # Path to ChromeDriver
        service = Service("C:/path/to/chromedriver.exe")
        self.driver = webdriver.Chrome(service=service)
        self.driver.get("https://")  

    def test_homepage_load(self):
        """Smoke Test: Check if the homepage loads successfully."""
        self.assertIn("Library Platform", self.driver.title)
        print("Homepage Load Test Passed")

     def test_user_login(self):
        """Functional Test: User login functionality."""
        driver = self.driver
        driver.find_element(By.ID, "username").send_keys("testuser")
        driver.find_element(By.ID, "password").send_keys("password123")
        driver.find_element(By.ID, "login-button").click()
        time.sleep(2)  # Allow time for page to load
        self.assertIn("Welcome", driver.page_source)
        print("Login Test Passed")

    def test_form_validation(self):
        """Regression Test: Check validation messages for empty login form."""
        driver = self.driver
        driver.find_element(By.ID, "login-button").click()
        time.sleep(1)
        error_message = driver.find_element(By.ID, "error-message").text
        self.assertEqual(error_message, "Please enter username and password")
        print("Form Validation Test Passed")

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
