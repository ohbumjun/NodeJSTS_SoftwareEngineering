package DBDESIGN_env_unification;
import java.sql.*;
import java.util.Scanner;
public class DB_OPERATOR {
    public static void main(String[] argv) {
        DatabaseAuthInformation db_info= new DatabaseAuthInformation();
        db_info.parse_auth_info("auth/mysql.auth");
        /* Preparation for dbprocess */
        Connection db_connection= null;
        PreparedStatement db_prepared_statement= null;
        ResultSet query_resultset= null;

        Statement db_statement= null;
        try {
            /* Driver load */
            Class.forName("com.mysql.cj.jdbc.Driver");
            /* Prepare the URL for DB connection */
            String db_connection_url= String.format("jdbc:mysql://%s:%s/%s" +
                            "?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false" +
                            "&serverTimezone=UTC", db_info.getHost(),
                    db_info.getPort(),
                    db_info.getDatabase_name());
            /* Set the DB connection */
            db_connection= DriverManager.getConnection(db_connection_url,
                    db_info.getUsername(),
                    db_info.getPassword());
            /* Set the query statement */

            db_statement= db_connection.createStatement();

            String query_string = null;

            query_string = "select content from post";

            db_prepared_statement= db_connection.prepareStatement(query_string);
            query_resultset= db_prepared_statement.executeQuery();

            while(query_resultset.next()){
                System.out.println(query_resultset.getString("content"));
            }



        } catch (ClassNotFoundException| SQLException e) {
            e.printStackTrace();
        } finally {
            try {
// Clean-up
                if (db_statement!= null) {
                    db_statement.close();
                }

                if (query_resultset!= null) {
                    query_resultset.close();
                }
                if (db_prepared_statement!= null) {
                    db_prepared_statement.close();
                }
                if (db_connection!= null) {
                    db_connection.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
