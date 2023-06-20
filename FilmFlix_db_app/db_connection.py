import sqlite3 as sql
from typing import Optional


class FilmFlixDatabase:
    def __init__(self, db_path):
        self.db_path = db_path
        self.connection = None
        self.cursor: Optional[sql.Cursor] = None

    def connect(self):
        try:
            self.connection = sql.connect(self.db_path)
            self.cursor = self.connection.cursor()
            print("Connected to the database.")
        except sql.Error as e:
            print(f"Error connecting to the database: {e}")

    def disconnect(self):
        if self.connection:
            self.cursor.close()  # type: ignore
            self.connection.close()
            print("Disconnected from the database.")

    def execute_query(self, query, values=None):
        try:
            if values:
                self.cursor.execute(query, values)  # type: ignore
            else:
                self.cursor.execute(query)  # type: ignore

            self.connection.commit()  # type: ignore
            print("Query executed successfully.")

            result = self.cursor.fetchall()  # type: ignore
            return result
        except sql.Error as e:
            print(f"Error executing query: {e}")
            return []

    def add_record(self, title, yearReleased, rating, duration, genre):
        query = f"""
        INSERT INTO tblfilms (title, yearReleased, rating, duration, genre)
        VALUES (?, ?, ?, ?, ?)
        """
        values = (title, yearReleased, rating, duration, genre)
        self.execute_query(query, values)
        print("Record added successfully.")

    def delete_record(self, filmID):
        query = "DELETE FROM tblfilms WHERE filmID = ?"
        self.execute_query(query, (filmID,))
        print("Record deleted successfully.")

    def get_record_by_id(self, filmID):
        query = "SELECT filmID, title, yearReleased, rating, duration, genre  FROM tblfilms WHERE filmID = ?"
        records = self.execute_query(query, (filmID,))
        return records[0] if records else None

    def amend_record(
        self,
        current_title,
        new_title,
        new_yearReleased,
        new_rating,
        new_duration,
        new_genre,
    ):
        query = "UPDATE tblfilms SET title = ?, yearReleased = ?, rating = ?, duration = ?, genre = ? WHERE title = ?"
        values = (
            new_title,
            new_yearReleased,
            new_rating,
            new_duration,
            new_genre,
            current_title,
        )
        self.execute_query(query, values)
        print("Record amended successfully.")

    def get_all_records(self):
        query = (
            "SELECT filmID, title, yearReleased, rating, duration, genre  FROM tblfilms"
        )
        records = self.execute_query(query)
        return records

    def get_genre(self, genre):
        query = "SELECT filmID, title, yearReleased, rating, duration, genre  FROM tblfilms WHERE genre = ?"
        records = self.execute_query(query, (genre,))
        return records

    def get_year(self, year):
        query = "SELECT filmID, title, yearReleased, rating, duration, genre  FROM tblfilms WHERE yearReleased = ?"
        records = self.execute_query(query, (year,))
        return records

    def get_rating(self, rating):
        query = "SELECT filmID, title, yearReleased, rating, duration, genre  FROM tblfilms WHERE rating = ?"
        records = self.execute_query(query, (rating,))
        return records
