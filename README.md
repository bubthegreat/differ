# Differ

I'm tired of seeing all the differ things that have no data persistence, or need you to sign up or log in to be able to share things, so I wrote this so we could use it internally.


# Setup

For a local one, there are three commands, assuming you have docker and docker-compose installed on the machine you're running them from:

1. `git clone https://gitlab.com/bubthegreat/differ.git`
2. `cd differ`
3. `docker network create web --attachable=true`
4. `docker-compose up`

You should be able to navigate to http://app.differ.localhost by default.  The volume definitions should allow the diffs to be pulled back out for easy referencing - but this won't be reachable by others until I deploy it somewhere more fancy.

# To Do

* Add URL parsing for common URLs that we'd want to diff, so you don't have to copy and paste the whole output every time.
* Deploy to a production site (probably differ.bubtaylor.com for now) and hope people don't abuse it. :D
* Possibly add a raw URL mode where you can specify the diffs in the URL for link sharing, so there doesn't need to be any persistence, but links will be big.



