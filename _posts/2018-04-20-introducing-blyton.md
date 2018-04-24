---
layout: post
title: Introducing Blyton
---
<div class="message">
Blyton is a unique book recommender system to generate recommendations for readers based on their guided reading levels.
</div>
# [<center>See it in action</center>]()
## <a name="bg"></a> Background 

### [Guided Reading & Leveled Reading Systems](http://www.scholastic.com/parents/resources/article/book-selection-tips/parents-guide-to-guided-readin) 
It is a practice designed to allow students to develop reading proficiency by providing differentiated teaching and is usually in small-group settings. Guided reading is used in classrooms, in small-sized reading clubs and for independent reading. When a child enters a new grade, he is assigned a guided reading level based on his word-knowledge, comprehension skills and fluency allowing the teacher to work closely with each student and help them become better readers by suggesting new challenging books. 
In a similar way, books are assigned guided reading levels too. These levels indicate the complexity of a book taking into account book characteristics such as genre, text structure, content, ideas, sentence complexity, words, vocabulary, print features etc.    
Following is a list of [leveled reading systems](https://www.scholastic.com/teachers/articles/teaching-content/leveled-reading-systems-explained/) that are commonly used depending on the students, curriculum (reading methods and materials), colleagues (of the teacher) and parents (comparison with other children).

- **[Grade Level Equivalent](http://www.fountasandpinnell.com/textlevelgradient/)** 
- **[Guided Reading Level](http://teacher.scholastic.com/products/guidedreading/leveling_chart.htm)**
- **[Lexile Measure](https://lexile.com/)**
- **[Developmental Reading Assessment (DRA)](http://4cameron.weebly.com/uploads/1/3/7/4/13748160/dra-summary_1.pdf)**
- Interest Level
- Grade Level
- Reading Recovery

**Blyton uses a combination of the [Lexile](http://www.scholastic.com/parents/resources/article/book-selection-tips/lexile-levels-made-easy) reading score, book ratings and user preference to generate book recommendations for the readers.**

## <a name="motive"></a> Motivation for Blyton
Currently, only teachers and parents who are familiar with the workings of reading levels suggest new books to a child taking his or her guided reading level into consideration. This has several caveats like human error, bias, lack of empirical evidence behind suggestions etc. There is no commercially available automatic recommender system grounded in theory suggesting books to children on the basis of their reading levels. Blyton attacks this problem, being a simple web-based tool that generates accurate recommendations for students and thereby, offload the teacher and/or parent of this task.

### Who would use Blyton?
Blyton would be used in schools and reading clubs to get better recommendations for individual readers. Both teachers and students (of different reading abilities) can use the tool to get recommendations on new books according to the student’s Lexile scores(or other guided system scores), interest and other factors. 

## <a name="rel-work"></a>Related Work
The following systems are similar to Blyton:

### Commercial Systems
**[Goodreads](https://www.goodreads.com/)(social network for book lovers)**

- **System Overview**: Uses a hybrid approach - recommendations on the basis of books rated by the user in the past and books that people with similar taste have liked.
- **Cons**: 
Requires the user to rate at-least 20 books before it can give recommendations
Does not take into account the reading ability of the users

**[Amazon’s Recommender System for Books](https://www.amazon.com/s/ref=lp_4_nr_p_n_feature_thirteen_0?fst=as%3Aoff&rh=n%3A283155%2Cn%3A%211000%2Cn%3A4%2Cp_n_feature_thirteen_browse-bin%3A6938732011&bbn=4&ie=UTF8&qid=1524235898&rnid=6938731011)**

- **System Overview**: Amazon’s recommender system has evolved over the years incorporating several factors/techniques but the base algorithm still uses the widely successful simple item-based collaborative filtering introduced in 2003.   
- **Cons**:
Geared more towards the general e-commerce products
Only has Lexile measures for the books (does not take into account other reading systems)
Not focused on enhancing user’s reading ability but selling products

**[Scholastic Book Wizard](https://www.scholastic.com/teachers/bookwizard/)**

- **System Overview**: Provides list of books categorized by guided reading systems, genre, subject, grade etc.  
- **Cons**: 
Lacks a good recommender system

**Other book recommender systems**: bookbub.com, librarything.com, whichbook.net, whatshouldireadnext.com, Booklamp (acquired by Apple), lazylibrary.com.

### Research Papers
The following are few research papers highlighting concepts similar to Blyton:

- [M. S. Pera and Y. K. Ng, "How Can We Help Our K-12 Teachers?: Using a Recommender to Make Personalized Book Suggestions," 2014 IEEE/WIC/ACM International Joint Conferences on Web Intelligence (WI) and Intelligent Agent Technologies (IAT), Warsaw, 2014, pp. 335-342](https://ieeexplore.ieee.org/abstract/document/6927643/).

- [Petrović, Iva, Paolo Perković, and Ivan Štajduhar. "A profile-and community-driven book recommender system." In Information and Communication Technology, Electronics and Microelectronics (MIPRO), 2015 38th International Convention on, pp. 631-635. IEEE, 2015.](https://ieeexplore.ieee.org/abstract/document/7160349/)

- [Y. Zhu, "A book recommendation algorithm based on collaborative filtering," 2016 5th International Conference on Computer Science and Network Technology (ICCSNT), Changchun, 2016, pp. 286-289.](https://ieeexplore.ieee.org/document/8070165/)

- [Rendle, Steffen, Christoph Freudenthaler, Zeno Gantner, and Lars Schmidt-Thieme. "BPR: Bayesian personalized ranking from implicit feedback." In Proceedings of the twenty-fifth conference on uncertainty in artificial intelligence, pp. 452-461. AUAI Press, 2009.](https://dl.acm.org/citation.cfm?id=1795167)

### How Blyton is different?

Since Blyton aims to create a curated reading list of book recommendations for an individual reader keeping in mind his or her reading ability it differs from the previous systems in the following ways:

- Focused on enhancing the reading ability of the student by suggesting books that help in developing a higher leveled reading score if the student is improving in his or her performance or suggesting books that help the student in creating a solid foundation on his current reading level before moving higher.
Suggesting books that are of student’s interest taking into account the genre of books he is reading, interest in the topic and student’s reading ability.
- A narrow user base (focusing primarily on children and beginner readers) and narrow book dataset (focused on books with Leveled Reading Scores).
- Reducing the effort of teachers in finding and suggesting books to students taking into account their abilities and interest.

## <a name="working"></a>Proposed Solution

### Overview of the service
Blyton runs on a **[Jupyter Notebook](http://jupyter.org/)**-powereed REST-service. The front-end of the web app is built on **[Angular Material](https://angular.io/)**.

### Dataset

#### Creating the Dataset
The dataset is created from three sources:  

**[Amazon Book Dataset - Ratings (am-r)](http://jmcauley.ucsd.edu/data/amazon/)**  
This dataset contains the ratings of ~22 million book ratings. A typical record holds: user_id, item_id, rating entries.  

**[Scholastic Book Wizard (sc-bw)](https://www.scholastic.com/teachers/bookwizard)**    
Scraped **Scholastic Book Wizard** pages filtered by lexile score. Typical record contains: name, lexile pairs.
View the **[Scrapy](https://scrapy.org/)** script [here](https://github.tamu.edu/ankurrc/cs670-Blyton/blob/master/code/crawler/BooksSpider.py).  

**[Amazon Book Dataset - Metadata (am-m)](http://jmcauley.ucsd.edu/data/amazon/)**  
This dataset contains metadata for about 3 million books, including: name, author, price, image url etc.  

#### Data Engineering  

We collated the three datasets in the following way:
1. Our primary purpose was to augment Amazon's book dataset with Scholastic's lexile score dataset. 
2. The number of books in either dataset was different. Moreover, each dataset had duplicate titles.
3. 'am-m' and 'sc-l' were rid of duplicate book titles, and contained **1860814** and **45900** titles, respectively.
4. Of these titles, the common ones were chosen and both the datasets were merged on this criteria. Now, we had **9910** titles.
5. The merged dataset (merge-df), now contained a typical entry as book id, title, lexile, author, img-url.
6. Once we obtained the merged dataset in step 5, we had to sieve out all ratings from 'am-r' for book ids not in 'merged-df'
7. Once we sieved out such entries, we found that there were **331276** ratings from **258905** users. This implied that certain users were likely to have rated only one book. 
8. In light of step 7, we decided to convert the dataset to be 5-core, i.e each user should atleast have 5 rated items. Noe our dataset (utility-df) contained **42472** ratings from **3822** users on **6052** books.  

IPython notebooks can be checked out [here](https://github.tamu.edu/ankurrc/cs670-Blyton/tree/master/code/data.engg) 


### Algorithm
For our recommendation task we relied on Latent Factor Models. We leverged the **[Surprise](http://surpriselib.com/)** open-source recommender library for evaluating various LFMs. We settled on **SVD++** as it gave us the best score in terms of the RMSE.  

We generated predictions for all **3822** users on **6052** books, totalling **23088272** predictions.  

Once we had all the predictions, we sought to incorporate the lexile score for each user. Since our ratings were 5-core, we looked for the lexile rating of the last 5 books that a user had rated. We calulated the **mean weighted lexile** of each user by muliplying their book rating with the lexile score, and normalized it with the sum of the 5 ratings.  
Once we had the mean lexile rating for a user, we sorted the books on predicted ratings. We then pick the books that are closest (within a 10-point shift) to the users calculated **mean weighted lexile** score.
## Evaluation of Results

The evaluation of the various LFMs we used:  

| Algorithm | RMSE   | MAE    | Fit Time (Test Time) (seconds) |
|-----------|--------|--------|--------------------------------|
| SVD       | 0.8047 | 0.6154 | 2.14 (0.36)                    |
| SVD++     | 0.7988 | 0.6058 | 24.01 (1.04)                   |
| NMF       | 0.9653 | 0.7512 | 5.37 (0.72)                    |
| PMF       | 2.4462 | 2.0998 | 2.96 (0.12)                    |

Clearly, SVD++ was the best choice. Note: All the evaluations were done on 5-folds cross-validation. The numbers represent the mean of the values.  

We further tuned our SVD++ algorithm by performing a grid-search over it's hyperparameters.
We settled on the following values: **learning rate** = 0.009, **regularization constants** = 0.4 and **epochs** = 20.

## Conclusion
We have developed a LFM-based book recommender that takes into account the user's reading level.

### Our Learnings
1. Data engineering can be hard. It takes time and insight to clean the data, and expect reasonable results to allay "garbage-in, garbage-out."
2. LFM models work really well in practice, if overfitting can be minimized by proper regularization.
3. Enriching models by incorporating data from multiple modes, here ratings and lexile score, can be hard to come up with.
4. Writing spiders can be fun!

### Challenges We Faced
1. Data prepartion was time-consuming.
2. Making predictions repeatedly resulted in system-reboots due to out-of-memory errors.
3. Incorporating the lexile score was not straightforward.  


### Future Work
There are no commercial book recommenders that take into account reading levels. Our primitive approach needs to be tested further. Moreover, we hope to exploit the temporal aspects of the data, and perhaps come up with even more powerful models. One such approach could be the use of neural appraoches, namely "Gated Recurrent Units."

