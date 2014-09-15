package org.laojing.happystore.persistence;

import java.util.Iterator;
import java.util.Map;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.List;
import java.util.ArrayList;
import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;

import java.io.File;
import java.io.BufferedReader;
import java.io.StringReader;
import java.io.FileNotFoundException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import javax.json.Json;
import javax.json.stream.JsonParser;
import javax.json.stream.JsonParser.Event;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class StoreDao extends JdbcDaoSupport {
	public String getUser ( String username, String passwd ) {
		int count = getJdbcTemplate().queryForObject(
				"select count(*) from users where name='"+username+"' and passwd='"+passwd+"'", Integer.class);
		if ( count == 1 ) {
			return getJdbcTemplate().queryForObject(
					"select levels from users where name='"+username+"' and passwd='"+passwd+"'", String.class);
		} else {
			return "";
		}
	}

	public boolean changePass ( String username, String oldpasswd, String newpasswd ) {
		int result = getJdbcTemplate().update ( 
			"update users set passwd='"+newpasswd+"' where name='"+username+"' and passwd='"+oldpasswd+"';" );
		if ( result > 0 ) return true;
		else return false;
	}

	public boolean addUser ( String username, String passwd, String phone, String unit, String levels ) {
		int count = getJdbcTemplate().queryForObject(
				"select count(*) from users where name='"+username+"'", Integer.class); 
		if ( count >= 1 ) {
			return false;
		} else {
			int result = getJdbcTemplate().update ( 
				"insert into users values(NULL,'"+username+"','"+passwd+"','"+levels+"','"+phone+"','"+unit+"');" );
			if ( result > 0 ) return true;
			else return false;
		}
	}
	
	public List<List> getUsers(String userlevel) {
		return getJdbcTemplate().query(
			"select * from users order by levels", 
			new RowMapper(){
				public Object mapRow(ResultSet rs, int rowNumber)throws SQLException{
					List list = new ArrayList();
					list.add(rs.getString(1));
					list.add(rs.getString(2));
					list.add(rs.getString(3));
					list.add(rs.getString(4));
					list.add(rs.getString(5));
					list.add(rs.getString(6));
					return list;
				}
			}
		);
	}

	public boolean deleteUser ( String userid ) {
		int count = getJdbcTemplate().queryForObject(
				"select count(*) from users where id="+userid+" and levels='admin'", Integer.class);
		if ( count == 1 ) {
			count = getJdbcTemplate().queryForObject(
				"select count(*) from users where levels='admin'", Integer.class);
		} else {
			count = 0;
		}
		if ( count == 1 ) {
			return false;
		} else {
			int result = getJdbcTemplate().update ( 
					"delete from users where id="+userid+";" );
			if ( result > 0 ) return true;
			else return false;
		}
	}
	
	public List<List> getListFarms() {
		return getJdbcTemplate().query(
			"select code,name from farms order by code", 
			new RowMapper(){
				public Object mapRow(ResultSet rs, int rowNumber)throws SQLException{
					List list = new ArrayList();
					list.add(rs.getString(1));
					list.add(rs.getString(2));
					return list;
				}
			}
		);
	}

	public List<List> getListTurbines() {
		return getJdbcTemplate().query(
			"select code,name,farmcode from turbines order by code", 
			new RowMapper(){
				public Object mapRow(ResultSet rs, int rowNumber)throws SQLException{
					List list = new ArrayList();
					list.add(rs.getString(1));
					list.add(rs.getString(2));
					list.add(rs.getString(3));
					return list;
				}
			}
		);
	}

	public boolean setCommand ( String farmnum, String turbinenum, String turbcmd ) {
		int result = getJdbcTemplate().update ( 
			"update turbines set command="+turbcmd+" where code="+turbinenum+" and farmcode="+farmnum+";" );
		if ( result > 0 ) return true;
		else return false;
	}

	public List<List> getTurbineMonitor(String farmnum, String turbinenum) {
		return getJdbcTemplate().query(
			"select * from turbine where code="+turbinenum+" and farmcode="+farmnum+" order by savetime desc limit 1", 
			new RowMapper(){
				public Object mapRow(ResultSet rs, int rowNumber)throws SQLException{
					List list = new ArrayList();
					for ( int i=1; i<=25; i++ ) {
						list.add(rs.getString(i));
					}
					return list;
				}
			}
		);
	}


	public List<List> getHomes() {
		return getJdbcTemplate().query(
			"select farmcode,sum(turbpower),avg(windspeed),count(*) from turbine,farms where farms.code=turbine.farmcode and genspeed>300 and unix_timestamp()-savetime<1.0 group by farmcode",
			new RowMapper(){
				public Object mapRow(ResultSet rs, int rowNumber)throws SQLException{
					List list = new ArrayList();
					list.add(rs.getString(1));
					list.add(rs.getString(2));
					list.add(rs.getString(3));
					list.add(rs.getString(4));
					return list;
				}
			}
		);
	}

	public int getFarmTurbines(String farmnum) {
		return getJdbcTemplate().queryForObject(
				"select count(*) from turbines where farmcode="+farmnum+"", Integer.class);
	}

	public List<List> getTurbineNames(String farmnum) {
		return getJdbcTemplate().query( "select code,name from turbines where farmcode="+farmnum,
			new RowMapper(){
				public Object mapRow(ResultSet rs, int rowNumber)throws SQLException{
					List list = new ArrayList();
					list.add(rs.getString(1));
					list.add(rs.getString(2));
					return list;
				}
			}
		);
	}

	public List<List> getFarmNames() {
		return getJdbcTemplate().query( "select code,name from farms",
			new RowMapper(){
				public Object mapRow(ResultSet rs, int rowNumber)throws SQLException{
					List list = new ArrayList();
					list.add(rs.getString(1));
					list.add(rs.getString(2));
					return list;
				}
			}
		);
	}


	public List<List> getTurbineOver(String farmnum) {
		return getJdbcTemplate().query(
			"select code,windspeed,turbpower,genspeed from turbine where farmcode="+farmnum+" and unix_timestamp()-savetime<1.0 order by savetime desc",
			new RowMapper(){
				public Object mapRow(ResultSet rs, int rowNumber)throws SQLException{
					List list = new ArrayList();
					list.add(rs.getString(1));
					list.add(rs.getString(2));
					list.add(rs.getString(3));
					list.add(rs.getString(4));
					return list;
				}
			}
		);
	}
}
